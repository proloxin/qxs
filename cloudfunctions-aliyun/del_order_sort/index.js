'use strict';
exports.main = async (event, context) => {
	/*
	用户报单错误，管理员删除该报单后，调用该函数，减去在途收益和报单数
	锁单后调用，没锁单就直接删除了
	*/
	const db = uniCloud.database();
	const dbCmd = db.command
	let {mobile,balance} =  event;
	return new Promise(async(resolve,reject)=>{
	    try {
	        let res = await db.collection('user-sort').where({
	        	mobile: mobile
	        }).update({
	        	tempbalance: dbCmd.inc(0-balance),
				count_order: dbCmd.inc(-1),
				
	        })
	        resolve(res)
	    } catch (err) {
	        reject(err)
	    }
	})
	
};
