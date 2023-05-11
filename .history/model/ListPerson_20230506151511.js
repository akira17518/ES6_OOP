import { Person, Student, Employee, Customer } from "../model/model.js";


export class ListPerson {
    users = [];
    add(user, userEnum) {
        // Check valid dựa trên loại người dùng
        if (userEnum == 1) {
            if (!checkValid(user) || !checkValidForStudent(user)) return;
        }
        if (userEnum == 2) {
            if (!checkValid(user) || !checkValidForEmployee(user)) return;
        }
        if (userEnum == 3) {
            if (!checkValid(user) || !checkValidForCustomer(user)) return;
        }
        // Check mã trùng
        let indexId = this.users.findIndex(user => this.user.id === user.id);
        console.log(indexId);
        this.users.push(user);
    }
    render() {
        let rowUser = "";
        for (let user of this.users) {
            let newUser = new Person();
            newUser = { ...newUser, ...user };
            rowUser += `
            <tr>
            <td>${newUser.id}</td>
            <td>${newUser.name}</td>
            <td>${newUser.email}</td>
            <td>${newUser.address}</td>
            <td>
            <button class="btn btn-danger rounded" id="btnChiTiet" data-toggle="modal" data-target="#chiTietSinhVienModal">Chi tiết</button>
            </td>
            </tr>
        `}
        return rowUser;
    }
    save() {
        let usersJson = JSON.stringify(this.users);
        localStorage.setItem("Mảng Người Dùng", usersJson);
    }
    get() {
        if (localStorage.getItem("Mảng Người Dùng")) {
            let users = JSON.parse(localStorage.getItem("Mảng Người Dùng"));
            this.users = users;
        }
    }
}