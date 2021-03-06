import http from '../../http/baseUrl.js'
import axios from 'axios';

const state = {
	showSort:false,
	showStar:false,
	showScreen:false,
    switchShow:true,
	listData:[]
};
const mutations ={
	changPopStatus(state,show){
		if(show == 'showSort'){
			state.showSort = true;
		}else if(show == 'showStar'){
			state.showStar = true;
		}else{
			state.showScreen = true;
		}
	},
	listDataLoad(state,upgradeData){
		var data = [];
		var type = upgradeData[0].type;
		var url = http.url + '/' + upgradeData[0].type;
		axios.get(url,upgradeData[1]).then(response => {
			data= response.data.data.results;
			state.listData= data;
		}).catch(function (error) {
		    console.log(error);
		});
	},
	saveHistory(state,history){
		var _id = history.id;
		var _hotelName = history.hotelName;
		var now = new Date();
		now.setDate(now.getDate()+7);
        var cookie = document.cookie;
		var arrAll = [];
		if(window.localStorage.username){
			var username = window.localStorage.username
			axios.get( http.url +'/userHistory',{params:{username:username,hName:_hotelName,date:now}}).then(response =>{
			}).catch(function(error){
				console.log(error);
			})
		}else{
			if(document.cookie){
		        cookie = cookie.split('; ');
		        cookie.forEach(function(item){
		            let arr = item.split('=');
		            if(arr[0]=='localHistory'){
		                arrAll = JSON.parse(arr[1]);
		            }
		        })
		        var newAll = arrAll.filter(function(item){
		        	return (item.hName != _hotelName);
		        })
		        newAll.push({hName:_hotelName});
		        document.cookie = "localHistory=" + JSON.stringify(newAll) + ';expires=' + now.toUTCString();
			}else{
				arrAll.push({hName:_hotelName});
				document.cookie = "localHistory=" + JSON.stringify(arrAll) + ';expires=' + now.toUTCString();
				console.log(arrAll,document.cookie);
			}
		}
	}

}

export default{
	state,
	mutations
}
