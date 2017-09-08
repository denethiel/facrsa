export class Utils {
  static getIndex(input:any, id:any){
    console.log("valores recibidos");
    console.log(input)
    console.log(id);
    var i = 0, len = input.length;
    for(; i < len; i++){

      if(input[i].id == id){
        return i;
      }
    }
    return null;
  }
}
