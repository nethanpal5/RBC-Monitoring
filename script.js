let assignments =
JSON.parse(localStorage.getItem("assignments")) || [];

renderTable();

function addAssignment(){

let startDate =
document.getElementById("startDate").value;

let endDate =
document.getElementById("endDate").value;

let days = "";

if(startDate && endDate){

let start = new Date(startDate);
let end = new Date(endDate);

days =
Math.ceil(
(end-start)/(1000*60*60*24)
);

}

let assignment = {

name:document.getElementById("name").value,
id:document.getElementById("employeeID").value,
type:document.getElementById("assignmentType").value,
branch:document.getElementById("branch").value,
region:document.getElementById("region").value,
position:document.getElementById("position").value,
start:startDate,
end:endDate,
days:days,
status:document.getElementById("status").value,
reason:document.getElementById("reason").value,
remarks:document.getElementById("remarks").value

};

assignments.push(assignment);

saveData();

renderTable();

}

function saveData(){

localStorage.setItem(
"assignments",
JSON.stringify(assignments)
);

}

function renderTable(){

let tbody =
document.querySelector("#assignmentTable tbody");

tbody.innerHTML="";

assignments.forEach((a,index)=>{

let row=`
<tr>

<td>${a.name}</td>
<td>${a.id}</td>
<td>${a.type}</td>
<td>${a.branch}</td>
<td>${a.region}</td>
<td>${a.position}</td>
<td>${a.start}</td>
<td>${a.end}</td>
<td>${a.days}</td>
<td>${a.status}</td>
<td>${a.reason}</td>
<td>${a.remarks}</td>

<td>

<button
class="deleteBtn"
onclick="deleteAssignment(${index})">
Delete
</button>

</td>

</tr>
`;

tbody.innerHTML += row;

});

updateDashboard();

}

function deleteAssignment(index){

if(confirm("Delete Assignment?")){

assignments.splice(index,1);

saveData();

renderTable();

}

}

function updateDashboard(){

let active =
assignments.filter(
x=>x.status==="Active"
).length;

let completed =
assignments.filter(
x=>x.status==="Completed"
).length;

document.getElementById(
"activeCount"
).innerText=active;

document.getElementById(
"completedCount"
).innerText=completed;

document.getElementById(
"totalCount"
).innerText=assignments.length;

}

function searchTable(){

let filter =
document.getElementById(
"searchBox"
).value.toUpperCase();

let tr =
document.querySelectorAll(
"#assignmentTable tbody tr"
);

tr.forEach(row=>{

let txt =
row.textContent;

row.style.display =
txt.toUpperCase().includes(filter)
? ""
: "none";

});

}

function exportCSV(){

let csv=[];

csv.push(
[
"Name",
"ID",
"Type",
"Branch",
"Region",
"Position",
"Started",
"Ended",
"Days",
"Status",
"Reason",
"Remarks"
].join(",")
);

assignments.forEach(a=>{

csv.push(
[
a.name,
a.id,
a.type,
a.branch,
a.region,
a.position,
a.start,
a.end,
a.days,
a.status,
a.reason,
a.remarks
].join(",")
);

});

let blob =
new Blob([csv.join("\n")],
{type:"text/csv"});

let url =
window.URL.createObjectURL(blob);

let link =
document.createElement("a");

link.href=url;
link.download=
"RBC_Assignments.csv";

link.click();

}