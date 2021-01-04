'use strict';
exports.main = async (event, context) => {
	/*
	累加qxs-total-price表中的price，输出总利润
	*/
	const db = uniCloud.database();
	const $ = db.command.aggregate
	return new Promise(async(resolve,reject)=>{
	    try {
	        let res = await db.collection('qxs-total-price').aggregate()
			.group({
				_id: null,
				count: $.sum('$price'),
			})
			.end()
	        resolve(res)
	    } catch (err) {
	        reject(err)
	    }
	})
	

};
