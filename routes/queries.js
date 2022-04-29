var express = require("express");
var router = express.Router();
var format = require('pg-format');
const fs = require('fs');
const datasingle = fs.readFileSync('./query_item.sql').toString();
const datafull = fs.readFileSync('./fullnftquery.sql').toString();
const dataselector = fs.readFileSync('./selector.sql').toString();
const tablenameQuery = fs.readFileSync('./tablename.sql').toString();

const Pool = require("pg").Pool;

const config = {
	connectionString: 'postgres://fqisttotgpivew:94a31ac293dd56ca6c5ea1cad4de724dc1ab22b1fa2fdacdb186b0c381df4c79@ec2-52-31-201-170.eu-west-1.compute.amazonaws.com:5432/d1m36gutvhjag1?sslmode=require',
	ssl: {
		rejectUnauthorized: false,
	}
}
const pool = new Pool({

	// user: "postgres",
	// host: "localhost",
	// database: "test2",
	// password: "admin",
	// multipleStatements: true,

	user: "fqisttotgpivew",
	host: "ec2-52-31-201-170.eu-west-1.compute.amazonaws.com",
	database: "d1m36gutvhjag1",
	password: "94a31ac293dd56ca6c5ea1cad4de724dc1ab22b1fa2fdacdb186b0c381df4c79",
	port: 5432,
});

const pool2 = new Pool(config);
pool2.connect().then(client => {
	console.log('connected')
    client.release()
  })
  .catch(err => console.error('error connecting', err.stack))
  .then(() => pool.end())
// Route pour afficher tous les NFT sur une même page, avec filtre via url sur les attributs background, aura, body etc.
// http://<DNS>/Filter?<attribute1>=<value1>&<attribute2>=<value2>,<value3>

 const Filter = (req, res, next) => {
	 const nftid = (Boolean(req.query.id)) ? req.query.id : "*";
	pool2.query(
		datafull, [nftid],
	(error, results) => {
		if (error) {
			throw error;
		}
		const filters = req.query;

		const filteredUsers = results.rows.filter(user => {
			let isValid = true;
			for (key in filters) {
			const value_splitted = filters[key];
			console.log(value_splitted);
			isValid = isValid && value_splitted.includes(user[key].toString());
			}
			return isValid;
		});
		res.send(filteredUsers);
	}
	);

};
// Route pour afficher profil de NFT complet en passant son id en paramètre d'url
// http://<DNS>/nftpage?nftid=<nftid>

const nftpage = (req, res, next) => {
	const nftidparam = req.query.nftid;

	pool2.query(
		datasingle, [nftidparam],
		(error, results) => {
			if (error) {
				throw error;
			}
			res.status(200).json(results.rows);
		}
	);

};

// Route pour afficher la drop down list d'un sélecteur. Affichage de tous les attributs de la table sélectionnée
//http://<DNS>/selector/<table_name>
const selector = (req, res, next) => {
	var param = req.params.param;
	var paramid = param + "id";

	pool2.query(
		format(dataselector, paramid, param),
		(error, results) => {
			if (error) {
				throw error;
			}
			res.status(200).json(results.rows);
		}
	);
}

const tablename = (req, res, next) => {
	pool2.query(tablenameQuery, (error, results) => {
		if(error){
			throw error;
		}
		res.status(200).json(results.rows);
	})
}


module.exports ={
	Filter,
	nftpage,
	selector,
	tablename
  }
