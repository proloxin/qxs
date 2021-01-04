'use strict';
exports.main = async (event, context) => {
	/*
	新建报单，管理员确认锁单后，使用该函数，增加在途收益和该用户总抢单数
	*/
	const db = uniCloud.database();
	const dbCmd = db.command
	let {mobile,balance} =  event;
	return new Promise(async(resolve,reject)=>{
	    try {
	        let res = await db.collection('user-sort').where({
	        	mobile: mobile
	        }).update({
	        	tempbalance: dbCmd.inc(balance),
				count_order: dbCmd.inc(1),
				
	        })
	        resolve(res)
	    } catch (err) {
	        reject(err)
	    }
	})
	
};
