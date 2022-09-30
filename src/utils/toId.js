module.exports.toId =(diets)=>{
    return diets.map(d=> 
      (d === 'gluten free')? d='b8b43c60-3950-11ed-85e5-494b019fb880' :
      (d === 'dairy free')? d='b8b4b190-3950-11ed-85e5-494b019fb880' :
      (d === 'ketogenic')? d='b8b4d8a0-3950-11ed-85e5-494b019fb880' :
      (d === 'vegetarian')? d='b8b65f40-3950-11ed-85e5-494b019fb880' :
      (d === 'lacto vegetarian')? d='b8b6d470-3950-11ed-85e5-494b019fb880' :
      (d === 'lacto ovo vegetarian')? d='b8ba08c0-3950-11ed-85e5-494b019fb880' :
      (d === 'ovo vegetarian')? d='b8ba2fd0-3950-11ed-85e5-494b019fb880' :
      (d === 'vegan')? d='b8baa500-3950-11ed-85e5-494b019fb880' :
      (d === 'pescatarian')? d='b8bb4140-3950-11ed-85e5-494b019fb880' :
      (d === 'paleolithic')? d='b8bc2ba0-3950-11ed-85e5-494b019fb880' :
      (d === 'primal')? d='b8bc79c0-3950-11ed-85e5-494b019fb880' :
      (d === 'fodmap friendly')? d='b8bcc7e0-3950-11ed-85e5-494b019fb880' :
      (d === 'whole 30')? d='b8bceef0-3950-11ed-85e5-494b019fb880'              
      : d='405652d0-3941-11ed-adbc-b59010746b8e'
      )
  }