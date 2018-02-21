import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'search'
})
export class search implements PipeTransform {
  	public transform(value, keys: string, term: string) {
	    if (!term) return value;

	    var KeyArr = (keys.split(','));
	    var regex = new RegExp(term, 'gi');

	    return (value || []).filter((item)=>{
	    	let match = false;
	    	function iterate(obj) {
		        for (var property in obj) {
		            if (obj.hasOwnProperty(property)) {
		                if (typeof obj[property] == "object") {
		                    iterate(obj[property]);
		                } else {
		                    if(KeyArr.indexOf(property) != -1){
		                    	if (regex.test(obj[property])){
		                    		match = true;
		                    		break;
		                    	}
		                    }
		                }
		            }
		        }
		        return match; 
		    }
		    var chk = iterate(item)
			return chk;
	    });
	}
}