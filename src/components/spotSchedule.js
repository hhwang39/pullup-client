import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postReservations } from '../actions';
import { Field, reduxForm } from 'redux-form';
import {Checkbox, FormGroup} from 'react-bootstrap';
class SpotSchedule extends Component {

    clickReservation(id) {
        console.log('clicked ' + id);
    }

    renderSchedule() {
        return _.map(this.props.reservations, reservation => {
            return (
                <li className='myReservation' key={reservation.id} onClick={() => this.clickReservation(reservation.id)}>
                    <div>{reservation.id}</div>
                    <div>{String(reservation.reserved)}</div>
                </li>
            );
        });
    }

    renderTable() {
        return _.map(this.props.reservations, reservation => {
            return (
                <div key={reservation.id} className='myReservation'>{this.getTime(reservation.id) + " - "+ this.getTime(reservation.id + 1)}</div>
            );
        })
    }
                  

    getTime(id) {
        const num = Number(id)*30;
        const hour = Math.floor(num/60);
        const min = num%60;
        const hourString = hour < 10 ? `0${hour}` : `${hour}`;
        const minString = min == 0 ? `00` : `${min}`;
        return `${hourString}:${minString}`;
    }

    renderAvail() {
        return _.map(this.props.reservations, reservation => {
            return (
                <div key={reservation.id} className='myReservation'>{String(reservation.reserved)}</div>
            );
        })
    }

    // renderCheck() {
    //     return ( 
    //         <FormGroup className="table-check-form-group">
    //         {
    //             _.map(this.props.reservations, reservation => {
    //                 return (
    //                     <Checkbox key={reservation.id} 
    //                               disabled={reservation.reserved} 
    //                               name={`${reservation.id}-${this.getTime(reservation.id)}`}>{reservation.reserved ? "reserved" : "vacant"}</Checkbox>   
    //                 );
    //             })
    //         }
    //         </FormGroup>
    //     );
    // }

    renderField(field) {
        console.log(field);
        return (
            <Checkbox {...field.input}>{field.reserved ? "reserved" : "vacant"}</Checkbox>
            // <input className='form-control' type='checkbox' {...field.input} />
        );
    }

    renderFields() {
        return (
            <FormGroup className="table-check-form-group">
                {
                    _.map(this.props.reservations, reservation => {
                        return (
                            
                            <Field
                                key={reservation.id}
                                type='checkbox'
                                name={`${reservation.id}-${this.getTime(reservation.id)}`}
                                reserved={reservation.reserved}
                                component={this.renderField} />
                            
                        );
                    })
                }
            </FormGroup>
        )
    }

    onSubmit(values) {
        console.log("Submitted");
        console.log("values", values);
        const date = new Date();
        const time = _.map(values, (value, key) => {
            return key.split('-')[0];
        })
        const data = {
            time: time[0],
            date: `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`,
            SUUID: this.props.activeSpot,
            UUID :  this.props.config.headers.UUID
        }
        console.log("data", data);
        this.props.postReservations(data, this.props.config);
    }
    
    render() {
        if (!this.props.activeSpot || !this.props.reservations[0]) {
            return <div></div>
        }
        const { handleSubmit } = this.props;

        return (
            <form className='myReservation' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <table className='table'  id='myReservationList'>
                    <tbody>
                        <tr>
                            <th>Time</th>
                            <th>Reserved</th>
                        </tr>
                        <tr>
                            <td>
                                {this.renderTable()}
                            </td>
                            <td>
                                {this.renderFields()}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type='submit' className='btn btn-primary'>Submit</button>
            </form>
        );  
    }
}

function mapStateToProps({ reservations, activeSpot, config})  {
    return { reservations, activeSpot, config };
}

export default reduxForm({
    form: 'ReservationPage'
})(
    connect(mapStateToProps,{ postReservations })(SpotSchedule)
);