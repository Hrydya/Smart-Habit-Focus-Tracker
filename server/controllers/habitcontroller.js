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
        const { userId } = req.user
        const habitId = req.params.id
        const habit = await Habit.findOne({ _id: habitId, user: userId })
        if (!habit) {
            return res.status(404).json({ msg: "habit not found" })
        }
        habit.completed = true
        habit.streak = habit.streak + 1
        await habit.save()
        res.status(200).json({ habit })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}


module.exports = {createHabit,deleteHabit, getHabits,completeHabit}