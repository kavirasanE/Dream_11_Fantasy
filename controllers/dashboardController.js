const connectDB = require("../config/dbConfig");
const { QueryTypes } = require("sequelize");

const dashboard = async (req, res) => {
  const statement = `SELECT A.UDR_Id, ShopName AS 'Shop Name', A.CreatedOn AS 'Registered On', DeviceId AS 'Device ID',B.Subcription_Start_Date,B.Subcription_End_Date,IsSubcription AS 'Subscription',ShopAddress AS 'Address',Mobile AS 'Mobile Number',A.IsActive AS 'User Status',D.TransactionId AS 'Transaction ID',D.CreatedOn AS 'Register On' FROM MAS_UserDeviceRegister A LEFT JOIN TBL_ManageSubcription B ON A.UDR_Id = B.UDR_Id INNER JOIN MAS_SubcriptionType C ON B.Sub_Type_Id = C.Sub_Type_Id INNER JOIN TBL_ManagePayment D ON B.Manage_Sub_Id = D.Manage_Sub_Id WHERE B.IsActive = 1 AND C.IsActive = 1`;
  const statement2 = `select * from MAS_SubcriptionType WHERE IsActive = 1`;
  const statement3 = `SELECT A.Payment_Id, A.UDR_Id, B.ShopName, D.Price, A.TransactionId, A.CreatedOn FROM TBL_ManagePayment A INNER JOIN MAS_UserDeviceRegister B ON A.UDR_Id = B.UDR_Id INNER JOIN TBL_ManageSubcription C ON A.Manage_Sub_Id = C.Manage_Sub_Id INNER JOIN MAS_SubcriptionType D ON C.Sub_Type_Id = D.Sub_Type_Id`;

  const [results] = await connectDB.query(statement);
  const [subscriptions] = await connectDB.query(statement2);
  const [transaction] = await connectDB.query(statement3);

  res.status(200).json({ results: results, subscriptions,transaction });
};

module.exports = { dashboard };
