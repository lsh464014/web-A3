const db = require("../database/index");
module.exports.getAllUser = (req, res) => {
    const fundraiserId = req.query.id; 

    let sql = `
        SELECT *
        FROM fundraiser
    `;

    if (fundraiserId) {
        sql += `WHERE FUNDRAISER_ID = ${fundraiserId}`;
    }
    console.log(sql)
    db.query(sql, (err, results) => {
        console.log(sql)
        try {
            if (err) {
        
                console.log('err', err);
                return res.send({
                    code: 400,
                    msg: "error",
                    err
                });
            }

            res.send({
                code: 200,
                data: results,
            });

        } catch (error) {
       
            console.log('error', error);
            res.send({
                code: 500,
                msg: "Internal server error",
                error
            });
        }
    });
    
    
}
module.exports.getUserById = (req, res) => {
    const fundraiserId = req.query.id;
    if (!fundraiserId) {
        return res.send({
            code: 400,
            msg: "FUNDRAISER_ID is required",
        });
    }

    let sqlFundraiser = `
        SELECT * 
        FROM fundraiser 
        WHERE FUNDRAISER_ID = ?
    `;


    let sqlDonation = `
        SELECT * 
        FROM donation 
        WHERE fundraiser = ?
    `;


    db.query(sqlFundraiser, [fundraiserId], (err, fundraiserResults) => {
        if (err) {
            console.log('Error querying fundraiser:', err);
            return res.send({
                code: 400,
                msg: "Database query error",
                err: err
            });
        }


        if (fundraiserResults.length === 0) {
            return res.send({
                code: 404,
                msg: "Fundraiser not found"
            });
        }

  
        db.query(sqlDonation, [fundraiserId], (err, donationResults) => {
            if (err) {
                console.log('Error querying donations:', err);
                return res.send({
                    code: 400,
                    msg: "Database query error",
                    err: err
                });
            }

       
            const fundraiser = fundraiserResults[0];
            const responseData = {
                ...fundraiser,
                donations: donationResults 
            };

            res.send({
                code: 200,
                data: responseData,
            });
        });
    });
    
    
}
module.exports.getAllCategory= (req, res) => {
    let sql="select * from category"
    db.query(sql,(err,results)=>{
        try {
            if(err){
                res.send({
                    code: 400,
                    msg:"error"
                })
            }
     
            res.send({
                code: 200,
                data: results,
            })
            
        } catch (error) {
            
        }
        

    })
    
    
}
module.exports.getUserByOther = (req, res) => { 
    const { organizer, city, categoryId } = req.query;
    let sql = `SELECT * FROM fundraiser WHERE 1=1`;
    const params = [];
    if (organizer) {
        sql += ` AND ORGANIZER = ?`;
        params.push(organizer);
    }
    
    if (city) {
        sql += ` AND CITY = ?`;
        params.push(city);
    }

    if (categoryId) {
        sql += ` AND CATEGORY_ID = ?`;
        params.push(categoryId);
    }

    db.query(sql, params, (err, results) => {
        try {
            if (err) {
                return res.send({
                    code: 400,
                    msg: "Error retrieving data",
                });
            }
            if (results.length === 0) {
                return res.send({
                    code: 400,
                    msg: "No data found",
                });
            }

            res.send({
                code: 200,
                data: results,
            });
        } catch (error) {
            res.send({
                code: 500,
                msg: "Internal server error",
            });
        }
    });
};

module.exports.insertDonation = (req, res) => {
    const { donorName, amount, fundraiserId } = req.body;
    console.log(req.body.amount)

 
    if (!donorName || !amount || !fundraiserId) {
        return res.status(400).send({
            code: 400,
            msg: 'Donor Name, Amount and Fundraiser ID are required.'
        });
    }


    const sql = 'INSERT INTO donation (donors, money, date, fundraiser) VALUES (?, ?, NOW(), ?)';


    db.query(sql, [donorName, amount, fundraiserId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).send({
                code: 500,
                msg: 'Internal server error',
                error: err
            });
        }

    
        res.send({
            code: 200,
            msg: 'Donation inserted successfully',
            donationId: results.insertId
        });
    });
};
module.exports.deleteFundraiser = (req, res) => {
    console.log(req.query.id);
    const fundraiserId = req.query.id; 

 
    const checkDonationSql = 'SELECT COUNT(*) AS donationCount FROM donation WHERE fundraiser = ?';

    db.query(checkDonationSql, [fundraiserId], (err, donationResults) => {
        if (err) {
            return res.status(500).send({
                code: 500,
                msg: 'Error checking donations',
                error: err
            });
        }

        const donationCount = donationResults[0].donationCount;

        if (donationCount > 0) {
            return res.status(400).send({
                code: 400,
                msg: 'Fundraiser cannot be deleted because there are donations associated with it'
            });
        }

      
        const deleteSql = 'DELETE FROM fundraiser WHERE FUNDRAISER_ID = ?';

        db.query(deleteSql, [fundraiserId], (err, results) => {
            if (err) {
                return res.status(500).send({
                    code: 500,
                    msg: 'Error deleting fundraiser',
                    error: err
                });
            }

            if (results.affectedRows === 0) {
                return res.status(404).send({
                    code: 404,
                    msg: 'Fundraiser not found'
                });
            }

            res.send({
                code: 200,
                msg: 'Fundraiser deleted successfully'
            });
        });
    });
};
module.exports.createFundraiser=(req,res)=>{
    const { ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID } = req.body;

    if (!ORGANIZER || !CAPTION || !TARGET_FUNDING || !CURRENT_FUNDING || !CITY || !CATEGORY_ID) {
        return res.status(400).send({
            code: 400,
            msg: 'All fields are required.'
        });
    }

  
    const sql = `
        INSERT INTO fundraiser (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, ACTIVE)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
  
    db.query(sql, [ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, CATEGORY_ID, '1'], (err, results) => {
        if (err) {
            return res.status(500).send({
                code: 500,
                msg: 'Error creating fundraiser',
                error: err
            });
        }

        res.send({
            code: 200,
            msg: 'Fundraiser created successfully',
            fundraiserId: results.insertId 
        });
    });
}
module.exports.updateFundraiser = async (req, res) => {
    const fundraiserId = req.query.id;
    const { ORGANIZER, CAPTION, CITY, TARGET_FUNDING, CURRENT_FUNDING, CATEGORY_ID } = req.body;
console.log(fundraiserId)
    if (!fundraiserId) {
        return res.status(400).json({ message: 'Fundraiser ID is required' });
    }

    if (!ORGANIZER || !CAPTION || !CITY || !TARGET_FUNDING || !CATEGORY_ID) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const result = await db.query(
            `UPDATE fundraiser SET ORGANIZER = ?, CAPTION = ?, CITY = ?, TARGET_FUNDING = ?, CURRENT_FUNDING = ?, CATEGORY_ID = ? WHERE FUNDRAISER_ID = ?`,
            [ORGANIZER, CAPTION, CITY, TARGET_FUNDING, CURRENT_FUNDING, CATEGORY_ID, fundraiserId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Fundraiser not found' });
        }

        return res.status(200).json({ message: 'Fundraiser updated successfully' });
    } catch (error) {
        console.error('Error updating fundraiser:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
