


async function addEmploye(req,res) {
    try {
       const expenseData = req.body
       console.log(expenseData);
       const errors = await validateExpenseData(expenseData)

       if (errors.length > 0) {
        return res.status(400).json({
            error: true,
            message: "validation error",
            errors: errors
        });
    }


    await ExpenseDb.create(expenseData)
    res.status(200).json({
        error:false,
        message:"Employe added successfully"
    })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            error:true,
            message:"internel server error"
        })
    }
}


export default{
    addEmploye,
}