import React, { Component } from "react";
import axios from "axios";
import $ from "jquery";
import Modal from "../component/Modal";
import Toast from "../component/Toast";

class Orders extends Component {
    constructor() {
        super();
        this.state = {
            orders: [],
            id_order: "",
            id: "",
            id_alamat: "0",
            total: "",
            payment: "",
            status: "",
            detail: "",
            action: "",
            find: "",
            message: ""
        }

        //jika tidak terdapat data token pada local storage
        if(!localStorage.getItem("Token")){
            //direct ke hlaman login
            window.location = "/login";
        }
    }

    bind = (event) => {
    // fungsi utk membuka form tambah data
    this.setState({ [event.target.name]: event.target.value });
    }

    bindImage = (e) => {
        this.setState({image: e.target.files[0]});
    }
    
    get_orders = () => {
        $("#loading").toast("show");
        let url = "http://localhost/toko_online/public/orders";
        axios.get(url)
        .then(response => {
            this.setState({orders: response.data.orders});
            $("#loading").toast("hide");
        })
        .catch(error => {
            console.log(error);
        });
    }
    Accept = (id_order) => {
        if (window.confirm("Apakah anda yakin ingin menerima pesanan?")) {
            $("#modal_accept").toast("hide");
            let url = "http://localhost/toko_online/public/accept/" + id_order;
            let form = new FormData();
            axios.post(url)
            .then(response => {
                this.get_orders();
            })
            .catch(error => {
            console.log(error);
            });
        }
    }

    Decline = (id_order) => {
        if (window.confirm("Apakah anda yakin ingin menolak pesanan?")) {
            $("#modal_decline").toast("hide");
            let url = "http://localhost/toko_online/public/decline/" + id_order;
            let form = new FormData();
            axios.post(url)
            .then(response => {
                this.get_orders();
            })
            .catch(error => {
            console.log(error);
            });
        }
    }

    componentDidMount = () => {
        this.get_orders();
    }
    search = (event) => {
        if (event.keyCode === 13) {
            $("#loading").toast("show");
            let url = "http://localhost/toko_online/public/orders";
            let form = new FormData();
            form.append("find", this.state.find);
            axios.post(url, form)
            .then(response => {
                $("#loading").toast("hide");
                this.setState({ orders: response.data.orders });
            })
            .catch(error => {
            console.log(error);
            });
        }
    }
    render() {
        console.log(this.state.orders)
        return (
            <div className="container">
                <div className="card mt-2">
                    {/* header card */}
                    <div className="card-header bg-success">
                        <div className="row">
                            <div className="col-sm-8">
                                <h4 className="text-white">Orderan</h4>
                            </div>
                            <div className="col-sm-4">
                                <input type="text" className="form-control" name="find"
                                onChange={this.bind} value={this.state.find} onKeyUp={this.search}
                                placeholder="Pencarian..." />
                            </div>
                        </div>

                    </div>
                    {/* content card */}
                    <div className="card-body">
                        <Toast id="message" autohide="true" title="Informasi">
                            {this.state.message}
                        </Toast>
                        <Toast id="loading" autohide="false" title="Informasi">
                            <span className="fa fa-spin fa-spinner"></span> Sedang Memuat
                        </Toast>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Address</th>
                                    <th>Price</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Detail Order</th>
                                    <th>Option</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.state.orders.map((item, index) => {
                                    return(
                                        <tr key={index.id_order}>
                                            <td>{item.id_order}</td>
                                            <td>{item.username}</td>
                                            <td>{item.jalan}</td>
                                            <td>{item.total}</td>
                                            <td>
                                                <img src={'http://localhost/toko_online/public/images/' + item.payment}
                                                alt={item.payment} width="150px" height="200px"/>
                                            </td>
                                            <td>{item.status}</td>
                                            <td>
                                                {item.detail.map((it) => { return(
                                                    <ul key={it.id_order}>
                                                    <li>{it.name}({it.available_quantity})</li></ul>
                                                )})}
                                            </td>
                                            <td>
                                                <button className="m-1 btn btn-sm btn-info" onClick={() => this.Accept(item.id_order)}>
                                                    <span className="fa fa-check-circle"></span> Accept
                                                </button>
                                                <button className="m-1 btn btn-sm btn-danger" onClick={() => this.Decline(item.id_order)}>
                                                    <span className="fa fa-trash"></span> Decline
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        <Modal id="modal_accept" title="Accept" bg-header="warning" text_header="white">
                                <form onSubmit={this.Accept}>
                                    <input type="text" className="form-control" name="status" value={this.state.status}
                                        onChange={this.bind} placeholder="Status" required />
                                    <button type="submit" className="btn btn-dark m-2">
                                        <span className="fa fa-check-circle"></span> Save
                                    </button>
                                </form>
                        </Modal>

                        <Modal id="modal_decline" title="Accept" bg-header="warning" text_header="white">
                                <form onSubmit={this.Decline}>
                                    <input type="text" className="form-control" name="status" value={this.state.status}
                                        onChange={this.bind} placeholder="Status" required />
                                    <button type="submit" className="btn btn-dark m-2">
                                        <span className="fa fa-check-circle"></span> Save
                                    </button>
                                </form>
                        </Modal>

                    </div>
                </div>
            </div>
        );
    }
    
}
export default Orders;