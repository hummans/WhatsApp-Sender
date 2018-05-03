function searchById(id){
  var count = -1
  for(var i = 0;i < history.length;i++){
    count++
    if(history[i].messageid==id){
      break
    }
    if(i==history.length-1){
      return 'not found'      
    }  
  }
  return history[count]
}

console.log(searchById(5454))