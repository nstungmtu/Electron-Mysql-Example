const MainForm = document.forms['MainForm'];
const AddButton = document.querySelector('#AddButton');
const DataTable = document.querySelector('#DataTable');
const ChangePasswordModal = document.querySelector('#ChangePassword');
const SideMenu = document.querySelectorAll('#SideMenu li');
let currentPage = 1;
let maxPage = 1;
const pageCount = 10;

document.addEventListener("DOMContentLoaded",function(){
    //On document loaded, query users from database
    GetDataCount();
    LoadData();
});

//Load roles count from Database
function GetDataCount(){
    window.ElectronAPI.IPCInvoke('role:count',[])
    .then(res=>{
        //console.log(res);
        maxPage = Math.ceil(res[0].count/pageCount);
    })
    .catch(err=>{
        console.log(err)
        maxPage = 1;
    });
}

//Load roles from database
function LoadData(){
    window.ElectronAPI.IPCInvoke('role:list',[(currentPage-1)*(pageCount)])
    .then(res=>{
        //console.log(res);
        let rows = '';
        res.forEach(e=>{
            rows += CreateTableRow(e);
        });
        DataTable.innerHTML = rows;
    })
    .catch(err=>{console.log(err)});
}

function EnableForm(){
    MainForm.querySelectorAll('fieldset').forEach(function(elm){
        elm.disabled=false;
    })
}

function DisableForm(){
    MainForm.querySelectorAll('fieldset').forEach(function(elm){
        elm.disabled=true;
    });
}

//Handle AddButton click event
AddButton.addEventListener("click",function(event){
    MainForm.reset();
    MainForm.RoleID.value = "";
    EnableForm();
});

//Handle Form reset event
MainForm.addEventListener("reset",function(event){
    DisableForm();
});


//Handle Form submit event
MainForm.addEventListener("submit",function(event){
    event.preventDefault();
    const form = event.target;
    const data = [
        form.RoleName.value,
        form.Description.value,
    ];
    //if in add mode
    const id = form.RoleID.value;
    if(id==0 || id == '' || id == undefined)
    window.ElectronAPI.IPCInvoke('role:add',data)
    .then(res=>{
        GetDataCount();
        OnPaginatorItem_Click('last');
        MainForm.reset();
    })
    .catch(err=>{console.log(err)});
    else
    window.ElectronAPI.IPCInvoke('role:update',[...data,id])
    .then(res=>{
        LoadData();
        MainForm.reset();
    })
    .catch(err=>{console.log(err,[...data,id])});
    return false;
});

//Handle Edit
function OnEditButton_Click(button,id){
    window.ElectronAPI.IPCInvoke('role:get',id)
    .then(res=>{
        MainForm.RoleID.value = res[0].RoleID;
        MainForm.RoleName.value = res[0].RoleName;
        MainForm.Description.value = res[0].Description;
        EnableForm();
    })
    .catch(err=>{
        console.log(err);
        DisableForm();
    });
    return false;
}

//Handle Delete
function OnDeleteButton_Click(button,id){
    if(window.confirm("Are you sure?"))
    window.ElectronAPI.IPCInvoke('role:delete',id)
    .then(res=>{
        GetDataCount();
        currentPage = Math.min(currentPage,maxPage);
        window.alert("Deleted!");
        LoadData();
    })
    .catch(err=>{
        console.log(err);
    });
}

//Handle Paginator
function OnPaginatorItem_Click(action){
    switch(action){
        case 'first':{
            if(currentPage==1) return;
            currentPage = 1;
            break;
        }
        case 'prev':{
            if(currentPage==1) return;
            currentPage = Math.max(1,--currentPage);
            break;
        }
        case 'next':{
            if(currentPage==maxPage) return;
            currentPage = Math.min(maxPage,++currentPage);
            break;
        }
        case 'last':{
            currentPage = maxPage;
            break;
        }
    }
    //console.log(action, currentPage);
    LoadData();
}

SideMenu.forEach(e=>{
    e.addEventListener("click",function(elm){
        const link = e.getAttribute('data-page');
        window.ElectronAPI.IPCSend('route',link);
    });
})

function CreateTableRow(data){
    return `
    <tr>
        <td>${data.RoleID}</td>
        <td>${data.RoleName}</td>
        <td>${data.Description?data.Description:""}</td>
        <td class="nowrap">
            <button class="inline-button" onclick="OnEditButton_Click(this,${data.RoleID})"><i class="fa fa-edit"></i></button>
            <button class="inline-button primary-button" onclick="OnDeleteButton_Click(this,${data.RoleID})"><i class="fa fa-remove"></i></button>
        </td>
    </tr>`;
}