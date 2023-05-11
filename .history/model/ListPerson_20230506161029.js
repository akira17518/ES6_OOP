import { Person, Student, Employee, Customer } from "../model/model.js";


export class ListPerson {
    users = [];
    add(user, userEnum, form) {
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
        let indexId = this.users.findIndex(person => person.id == user.id);
        if (indexId != -1) {
            window.alert("Mã đã tồn tại!. Xin vui lòng nhập mã khác!");
            return;
        } else {
            window.alert("Thêm người dùng thành công !");
            this.users.push(user);
            document.querySelector(`${form}`).reset();
        }

    }
    delete(id) {
        let idXoa = this.users.findIndex(user => user.id == id);
        if (idXoa != -1) {
            this.users.splice(idXoa, 1);
            return true;
        }
        return false;
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
            <button class="btn btn-danger rounded" id="btnXoa" onclick="delete(${newUser.id})">Xóa</button>
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