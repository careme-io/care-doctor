import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'inArray'
})
export class inArray implements PipeTransform {
  	public transform(value, arr:any) {
	    if (!arr) return value;

	    // var KeyArr = (keys.split(','));
	    // var regex = new RegExp(term, 'gi');
	    console.log(arr);

	    return (value || []).filter((item)=>{
	    	console.log(item);
	    	return arr.indexOf(item._id) != -1;
	    	//let match = false;
	  //   	function iterate(obj) {
		 //        for (var property in obj) {
		 //            if (obj.hasOwnProperty(property)) {
		 //                if (typeof obj[property] == "object") {
		 //                    iterate(obj[property]);
		 //                } else {
		 //                    if(KeyArr.indexOf(property) != -1){
		 //                    	if (regex.test(obj[property])){
		 //                    		match = true;
		 //                    		break;
		 //                    	}
		 //                    }
		 //                }
		 //            }
		 //        }
		 //        return match; 
		 //    }
		 //    var chk = iterate(item)
			// return chk;
	    });
	}
}