'use strict';
exports.main = async (event, context) => {
	/*
	累加sort表中的balance_today，输出今日总收益
	*/
	const db = uniCloud.database();
	const $ = db.command.aggregate
	return new Promise(async(resolve,reject)=>{
	    try {
	        let res = await db.collection('user-sort').aggregate()
			.group({
				_id: null,
				count: $.sum('$balance_today'),
			})
			.end()
	        resolve(res)
	    } catch (err) {
	        reject(err)
	    }
	})
	

};
