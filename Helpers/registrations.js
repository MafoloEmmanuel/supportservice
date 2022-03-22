module.exports =(pool)=>{
    

    const storeData =async(name,email,problem)=>{
      const data=  await pool.query('insert into board (name,email,problem) values ($1,$2,$3)',[name,email,problem]);
console.log(data.rows)
    
      return data.rows

    }
    const getStoredData =async()=>{
var result = await pool.query('select name,email,problem from board');
console.log(result.rows)
return result.rows
    }
return{
    storeData,
getStoredData
}
}