const data = require("../data/tobacco.data");

function TobaccoModel(){
  
}

TobaccoModel.prototype.search = function(code){
  for(var i=0;i<data.length;i++){
    var d = data[i];
    if(code == d.CGT_CARTON_CODE){
      return d;
    }
  }
  return null;
}


module.exports = TobaccoModel;