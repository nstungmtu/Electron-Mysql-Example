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
    LoadRoles();
});

//Load users count from Database
function GetDataCount(){
    window.ElectronAPI.IPCInvoke('user:count',[])
    .then(res=>{
        //console.log(res);
        maxPage = Math.ceil(res[0].count/pageCount);
    })
    .catch(err=>{
        console.log(err)
        maxPage = 1;
    });
}

//Load users from database
function LoadData(){
    window.ElectronAPI.IPCInvoke('user:list',[(currentPage-1)*(pageCount)])
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

function LoadRoles(){
    window.ElectronAPI.IPCInvoke('role:list',[])
    .then(res=>{
        let options='';
        res.forEach(e=>{
            options += CreateRoleOptions(e);
        })
        MainForm.RoleID.innerHTML = options;
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
        form.Login.value,
        form.UserName.value,
        form.Disabled.checked,
        form.RoleID.value
    ];
    //if in add mode
    const id = form.UserID.value;
    if(id==0 || id == '' || id == undefined)
    window.ElectronAPI.IPCInvoke('user:add',data)
    .then(res=>{
        GetDataCount();
        OnPaginatorItem_Click('last');
        /* DataTable.innerHTML += CreateTableRow({
            UserID: res.insertId,
            Login: data[0],
            UserName: data[1],
            RoleName: MainForm.RoleID.innerText,
            Created: (new Date()).toLocaleString('vi-VN'),
            LastUpdated: (new Date()).toLocaleString('vi-VN'),
            Disabled: data[3]
        }); */
        MainForm.reset();
    })
    .catch(err=>{console.log(err)});
    else
    window.ElectronAPI.IPCInvoke('user:update',[...data,id])
    .then(res=>{
        LoadData();
        MainForm.reset();
    })
    .catch(err=>{console.log(err,[...data,id])});
    return false;
});

//Handle Edit
function OnEditButton_Click(button,id){
    window.ElectronAPI.IPCInvoke('user:get',id)
    .then(res=>{
        MainForm.UserID.value = res[0].UserID;
        MainForm.UserName.value = res[0].UserName;
        MainForm.Login.value = res[0].Login;
        MainForm.RoleID.value = res[0].RoleID;
        MainForm.Disabled.checked = res[0].Disabled;
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
    window.ElectronAPI.IPCInvoke('user:delete',id)
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

//Handle Reset Password
function OnResetPWButton_Click(button,id){
    window.alert("Not implemented!");
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
            if(currentPage==maxPage) return;
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
        <td>${data.UserID}</td>
        <td>${data.Login}</td>
        <td>${data.UserName}</td>
        <td>${data.Created.toLocaleString('vi-VN')}</td>
        <td>${data.LastUpdated.toLocaleString('vi-VN')}</td>
        <td>${data.Disabled?`<span class="status disabled">disabled</span>`:`<span class="status">active</span>`}</td>
        <td>${data.RoleName}</td>
        <td class="nowrap">
            <button class="inline-button" onclick="OnResetPWButton_Click(this,${data.UserID})"><i class="fa fa-recycle"></i></button>
            <button class="inline-button" onclick="OnEditButton_Click(this,${data.UserID})"><i class="fa fa-edit"></i></button>
            <button class="inline-button primary-button" onclick="OnDeleteButton_Click(this,${data.UserID})"><i class="fa fa-remove"></i></button>
        </td>
    </tr>`;
}

function CreateRoleOptions(data){
    return `
    <option value="${data.RoleID}">${data.RoleName}</option>`;
}