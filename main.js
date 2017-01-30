var express = require('express');
var bodyParser = require('body-parser');
var apiai = require('apiai');
 
var appapi = apiai("466f30720f454d37b86ca74505b3dd2b");
var app = express();

app.use(express.static('public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/",function(req, res){

	res.sendFile("index.html");
});

app.post("/", function(req, res) {

	console.log("message:"+req.body.message)

	var request = appapi.textRequest(req.body.message, {
	    sessionId: 'session11'
	});

	request.on('response', function(response) {
	    console.log(response.result.fulfillment.speech);
	    console.log("sending")
	    res.send(response.result.fulfillment.speech)
	});
	 
	request.on('error', function(error) {
	    console.log(error);
	    res.send(error)
	});

	request.end();
});


app.post("/KRA",function(req, res){

	result = req.body.result;
	parameters = result.parameters;

  name = parameters.Name;
	
	console.log("PRINTING THE ARRAY name"+name)

  	kras= {
      
      'akshay' : {
          'kratitle' : {
                      'behaviour' : {'rate' : 3, 'comment' : 'good'},
                      'communication' : {'rate' : 2 , 'comment' : 'ok'}
                      }
                 },

      'abira' : {
          'kratitle' : {
                      'behaviour' : {'rate' : 5, 'comment' : 'very good'},
                      'communication' : {'rate' : 4 , 'comment' : 'good'}
                      }
                 },

      'shweta' : {
          'kratitle' : {
                      'behaviour' : {'rate' : 3, 'comment' : 'good'},
                      'communication' : {'rate' : 3 , 'comment' : 'good'}
                      }
                 },

      'saiba' : {
          'kratitle' : {
                      'behaviour' : {'rate' : 4, 'comment' : 'very good'},
                      'communication' : {'rate' : 3 , 'comment' : 'good'}
                      }
                 },
      'mayur' : {
          'kratitle' : {
                      'behaviour' : {'rate' : 5, 'comment' : 'Excellent'},
                      'communication' : {'rate' : 5 , 'comment' : 'Excellent'}
                      }
                 }
      }

  	console.log("PRINTING kra[name]"+kras[name]);
    speech="";
    for(i=0;i<name.length;i++)
    {

      if (kras[name[i]] == undefined)
    	{
  		speech = "KRAs are not set for "+name[i];
    	}
    	else
    	{
    		console.log(JSON.stringify(kras[name[i]]));
  		
  		speech = speech +"\n\n\n"+ "KRAs for "+name[i]+" are \n \
  		<table cellspacing='2'> \
  			<tr> \
  				<th>Title</th>\
  				<th> Rate </th>\
  				<th>Comment</th>\
  			</tr> \
  			<tr>\
  				<td>Behaviour</td>\
  				<td>"+kras[name[i]].kratitle.behaviour.rate+"</td>\
  				<td>"+kras[name[i]].kratitle.behaviour.comment+"</td>\
  			</tr>\
  			<tr>\
  				<td>Communication</td>\
  				<td>"+kras[name[i]].kratitle.communication.rate+"</td>\
  				<td>"+kras[name[i]].kratitle.communication.comment+"</td>\
  			</tr>\
  		</table>"

    	}
    }
  	console.log("speech : "+speech);

  	res.send({
          "speech": speech,
          "displayText": speech,
          "source": "apiai-onlinestore-shipping"
      });
  
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function(){
  console.log('App listening on port'+ PORT);
  console.log('Press Ctrl+C to quit.');
});
