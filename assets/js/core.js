var turn = true;// true = horde
var end = false;
var steps;
var player; //bot or not
var newTable;

function lblSizeChange()
{
	var lblSizeText = document.getElementById("lblSize");
	var number = document.getElementById("inputSize").value;		
	lblSizeText.value=number+"x"+number;
}
									
function checkWinner()
{
	if(newTable === undefined) 
	{
		return;
	}
	var vertical = true;
	var horizontal = true;
	var diagLeft = true;
	var diagRight = true;
	var number = document.getElementById("inputSize").value;
	for(var i = 0; i < number; i++)
	{
		vertical = true;
		horizontal = true;
		for(var j = 0; j < number; j++)
		{
			if(newTable.rows[i].cells[j].conqueror !== "H") 
			{
				horizontal = false;
			}
			if(newTable.rows[number - 1 - j].cells[i].conqueror !== "H") 
			{
				vertical = false;
			}
			if(i === j && newTable.rows[i].cells[j].conqueror !== "H")
			{
				diagLeft = false;
			}
			if(newTable.rows[i].cells[number - 1 - i].conqueror !=="H") 
			{
				diagRight = false;
			}
		}
	
		if(horizontal || vertical)
		{
			alert("Horde wins!");
			end = true;
			location.reload();
			return;
		}				
	}
	if(diagLeft || diagRight)
	{
		alert("Horde wins!");
		end = true;
		location.reload();
		return;
	}

	for(var i = 0; i < number; i++)
	{
		vertical = true, horizontal = true;
		for(var j = 0; j < number; j++)
		{
			if(newTable.rows[i].cells[j].conqueror !== "A")
			{
				horizontal = false;
			}
			if(newTable.rows[number - 1 - j].cells[i].conqueror!== "A") 
			{
				vertical = false;
			}
			if(i === j && newTable.rows[i].cells[j].conqueror !== "A") 
			{
				diagLeft = false;
			}
			if(newTable.rows[i].cells[number - 1 - i].conqueror !=="A") 
			{		
				diagRight = false;
			}
		}
	
		if(horizontal || vertical)
		{
			alert("Alliance wins!");
			end = true;
			location.reload();
			return;
		}				
	}
	if(diagLeft || diagRight)
	{
		alert("Alliance wins!");
		end = true;
		location.reload();
		return;
	}
	
	if(steps === 0 && !end)
	{
		alert("Draw :P");
		location.reload();
	}
}
	


function sillyBot()
{
	var emptyTiles = [];
	
	for(var i = 0, tr = newTable.querySelectorAll("tr"); i < tr.length; i++)
	{
		for(var j = 0; j < tr[i].querySelectorAll("td").length; j++)
		{
			if(tr[i].querySelectorAll("td")[j].conqueror === "") 
			{
				emptyTiles.push(tr[i].querySelectorAll("td")[j]);
			}
		}
	}
	if(emptyTiles.length !== 0)
	{
		var randIndex = 0 - 0.5 + Math.random()*emptyTiles.length;
		randIndex = Math.round(randIndex);
		emptyTiles[randIndex].addEventListener("click",putImage);
		emptyTiles[randIndex].click();		
	}
}


function createTable()
{
	var numberField = document.getElementById("inputSize");
	numberField.readOnly = true;
	
	var submitButton = document.getElementById("btnSubm");
	submitButton.disabled = "disabled";
	
	var number = numberField.value;
	steps = number * number;
	newTable = document.createElement("table");
	newTable.id = "fieldTable";
	newTable.border = "1";
	for(var i = 0; i < number; i++)
	{
		var newRow = newTable.insertRow(i);
		for(var j = 0; j < number; j++)
		{
			var newCell = newRow.insertCell(j);	
			newCell.addEventListener("click", putImage);
			newCell.conqueror = "";
		}	
	}	
	document.body.appendChild(newTable);
	
	
	player = document.getElementById("playerReal").checked;
	if(!player)   
	{
		if(document.getElementById("fracAlliance").checked)
		{
			document.getElementById("curTurnAlert").value = "FOR THE HORDE!";
		}
		else
		{
			turn = false;
			document.getElementById("curTurnAlert").value = "Alliance turn to attack!";
		}
		sillyBot();
	}
	else
	{
		if(document.getElementById("fracAlliance").checked)
		{
			turn = false;
			document.getElementById("curTurnAlert").value = "Alliance turn to attack!";
		}
		else
		{
			document.getElementById("curTurnAlert").value = "FOR THE HORDE!";	
		}
	}
}

function hordeImg(curCell)
{
	$(curCell).html("<img src = 'assets/images/horde1.png'>");
	turn = false;
	document.getElementById("curTurnAlert").value = "Alliance turn to attack!";
	curCell.conqueror = "H";
}

function allianceImg(curCell)
{
	$(curCell).html("<img src = 'assets/images/alliance.png'>");
	turn = true;
	document.getElementById("curTurnAlert").value = "FOR THE HORDE!";
	curCell.conqueror = "A";
}
setInterval(checkWinner, 200);
function putImage(evt)
{
	steps--;
	
	player = !player;
	if(this.innerHTML === "" && turn)
	{
		hordeImg(this);
	}
	else if(this.innerHTML ==="")
	{
		allianceImg(this);
	}
	else
	{
		return;
	}
	
	if(!player && !end) 
	{
		sillyBot();
	}
	
	if(end) 
	{
		location.reload();
	}
	
}