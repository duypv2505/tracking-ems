import React, { Component } from "react";
import { Button, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import * as EmsAction from '../../store/action/EmsAction/EmsAction';
import "./EmsContainer.scss";

class EmsContainer extends Component {

  state = {
    code: "",
    trackingDetail: null
  }

  tracking = async () => {
    if (document.getElementById("code").value.trim() === "") return;
    this.setState({ trackingDetail: null });
    let response = await this.props.trackingEms(document.getElementById("code").value);
    if (response !== null) {
      if (response.meta.code === 200 || response.meta.code == 4014) {
        this.setState({ trackingDetail: response.data });
      }
    }
  }

  renderTrackingDetail = () => {
    if (this.state.trackingDetail.length === 0) {
      return (
        <FormGroup>
          <h5>Mã vận đơn không đúng!</h5>
        </FormGroup>
      )
    }
    else if (this.state.trackingDetail.destination_country === undefined ||
      this.state.trackingDetail.destination_country === null) {
      return (
        <FormGroup>
          <h5>Không tìm thấy thông tin của vận đơn này</h5>
        </FormGroup>
      )
    }
    else if (this.state.trackingDetail.origin_info !== undefined) {
      return (
        <FormGroup className="trackingDetail">
          <h3>Thông tin vận đơn {this.state.trackingDetail.tracking_number}:</h3>
          <span>_ Dịch vụ: {this.state.trackingDetail.carrier_code}</span>
          <br></br>
          <span>_ Thời gian nhập mới nhất: {this.state.trackingDetail.lastUpdateTime}</span>
          <br></br>          
          <h4>Tiến trình</h4>
          {
            this.state.trackingDetail.origin_info.trackinfo.map((data, index) => {
              return (
                <div key={index}>
                  <span className="trackingTime">_ {data.Date}</span><span>: {data.StatusDescription}, </span>
                  <br></br>
                  <span>Địa chỉ: {data.Details}</span>
                  <br></br>
                  <span className="arrows">↑</span>
                  <br></br>
                </div>
              )
            })
          }
        </FormGroup>
      )
    }
  }

  render() {
    return (
      <div>
        <h1>Tracking đơn vận:</h1>
        <FormGroup>
          <Label>Mã EMS:</Label>
          <Input
            type="text"
            id="code"
            placeholder="Mã EMS"
          />
          <br></br>
          <Button color="primary" onClick={() => this.tracking()}>Tracking</Button>
        </FormGroup>
        {
          this.state.trackingDetail !== null ?
            this.renderTrackingDetail() : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {

  };
}

const dispatchToProps = dispatch => {
  return {
    trackingEms: (code) => dispatch(EmsAction.trackingEMS(code)),
  };
}

export default connect(mapStateToProps, dispatchToProps)(EmsContainer);
