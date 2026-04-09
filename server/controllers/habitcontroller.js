const Habit = require('../models/habitmodel');

const createHabit= async(req,res)=>{
    try{
        const { name } = req.body;
        const { userId } = req.user; 
        const habit = await Habit.create({ name, user: userId });
      res.status(201).json({ habit });
    }
    catch(error){
        res.status(500).json({msg:error.message});
    }
    
}
const deleteHabit= async(req,res)=>{
    try{
       
        const{userId}= req.user;
        const habitId = req.params.id;
        const habit = await Habit.findOne({_id:habitId, user:userId});
        if (!habit) {
            return res.status(404).json({ msg: "habit not found" })
        }
         await habit.deleteOne();
        res.status(200).json({ msg: "habit deleted" })
    }
    catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
const getHabits = async( req, res)=>{
    try{
    const {userId}= req.user;
    const habits = await Habit.find({user:userId});
    res.status(200).json({habits});
    }
    catch(error){
        res.status(500).json({ msg: error.message });
    }


}
const completeHabit = async (req, res) => {
    try {
        const { userId } = req.user;
        const habit = await Habit.findOne({ _id: req.params.id, user: userId });

        if (!habit) return res.status(404).json({ msg: "Habit not found" });

        const today = new Date().toDateString();
        const todayIndex = habit.completedDates.findIndex(d =>
            new Date(d).toDateString() === today
        );

        if (todayIndex !== -1) {

            habit.completedDates.splice(todayIndex, 1);
            habit.streak = Math.max(0, habit.streak - 1);
            habit.completed = false;
        } else {
            
            habit.completedDates.push(new Date());
            habit.streak += 1;
            habit.completed = true;
        }

        await habit.save();
        res.status(200).json({ habit });
    } catch (error) {
        console.error("Backend Error Details:", error);
        res.status(500).json({ msg: error.message });
    }
};
const getAnalytics = async (req, res) => {
    try {
        const { userId } = req.user
        const habits = await Habit.find({ user: userId })

        // streak leaderboard
        const streakLeaderboard = habits.map(h => ({
            name: h.name,
            streak: h.streak
        })).sort((a, b) => b.streak - a.streak)

        // completions per day this week
        const last7Days = [...Array(7)].map((_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - i)
            return d.toISOString().split('T')[0]
        }).reverse()

        const completionsPerDay = last7Days.map(date => ({
            date,
            count: habits.reduce((acc, habit) => {
                return acc + habit.completedDates.filter(d =>
                    d.toISOString().split('T')[0] === date
                ).length
            }, 0)
        }))

        // pie chart data
        const habitCompletion = habits.map(h => ({
            name: h.name,
            value: h.completedDates.length
        }))

        // smart insight
        const weekdayCompletions = habits.reduce((acc, habit) => {
            return acc + habit.completedDates.filter(d =>
                d.getDay() !== 0 && d.getDay() !== 6
            ).length
        }, 0)

        const weekendCompletions = habits.reduce((acc, habit) => {
            return acc + habit.completedDates.filter(d =>
                d.getDay() === 0 || d.getDay() === 6
            ).length
        }, 0)

        const insight = weekdayCompletions > weekendCompletions
            ? "You complete habits more on weekdays! 💪"
            : "You complete habits more on weekends! 🎉"

        res.status(200).json({ streakLeaderboard, completionsPerDay, habitCompletion, insight })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

module.exports = {createHabit,deleteHabit, getHabits,completeHabit,getAnalytics}