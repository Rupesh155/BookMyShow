 let express=  require('express')
  let app=   express()

app.get('/',(req,res)=>{
    res.send('heheh')

})

  app.listen(5000,()=>{
    console.log('server running on port no 5k');
    
  })
