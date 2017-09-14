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

export function uuid() {
    var i, random;
    var result = '';

    for (i = 0; i < 32; i++) {
        random = Math.random() * 16 | 0;
        if (i === 8 || i === 12 || i === 16 || i === 20) {
            result += '-';
        }
        result += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random))
            .toString(16);
    }

    return result;
};

