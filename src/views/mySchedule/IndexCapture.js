import React, { Component } from "react";
import Popup from "reactjs-popup";
import styled from 'styled-components'

import ScreenCapture from "./ScreenCapture";

const Styles = styled.div`
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  padding: 0;
  overflow-x: hidden;
}

h1,
p {
  font-family: Lato;
}

.crosshairs {
  position: absolute;
  width: 100%;
  z-index: 2147483645;
}

.crosshairs.hidden {
  display: none;
}

.crosshairs::before,
.crosshairs::after {
  content: "";
  position: absolute;
}

.crosshairs::before {
  height: 24px;
  width: 2px;
  background: #000;
  top: -11px;
}

.crosshairs::after {
  width: 24px;
  height: 2px;
  background: #000;
  left: -11px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.overlay.highlighting {
  background: none;
  border-color: rgba(0, 0, 0, 0.5);
  border-style: solid;
}

.modal__header {
  display: flex;
}

.modal__header button {
  margin-left: auto;
  font-size: 30px;
  border: none;
  background: #ffffff;
  cursor: pointer;
}

.modal__body {
  padding: 20px;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
}

.image__container {
  overflow: auto;
}

`

export default class IndexCapture extends Component {
    state = {
        screenCapture: "",
        open: false,
        title: "gimmeatitle"
    };

    handleScreenCapture = screenCapture => {
        this.setState(
            {
                screenCapture
            },
            () => {
                screenCapture && this.openModal();
            }
        );
    };

    openModal = () => this.setState({ open: true })
    closeModal = () => this.setState({ open: false, screenCapture: "" })

    handleOnChange = e => this.setState({ [e.target.name]: e.target.value })
    handleSave = () => {
        console.log(this.state.title, this.state.screenCapture);
    };

    render() {
        const { screenCapture } = this.state;
        console.log(screenCapture);
        return (
            <Styles>
                <ScreenCapture onEndCapture={this.handleScreenCapture}>
                    {({ onStartCapture }) => (
                        <>
                            <button onClick={onStartCapture}>Capture</button>
                            {/*<main>
                            <Test />
                        </main>*/}
                            <Popup open={this.state.open} modal closeOnDocumentClick>
                                <div className="modal">
                                    <div className="modal__header">
                                        <button onClick={this.closeModal}>&times;</button>
                                    </div>
                                    <div className="modal__body">
                                        <div>
                                            <label>Title</label>
                                            <input
                                                type="text"
                                                onChange={this.handleOnChange}
                                                name="title"
                                                value={this.state.title}
                                            />
                                        </div>
                                        <div className="image__container">
                                            {screenCapture && (
                                                <img src={screenCapture} alt="screen capture" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="modal__footer">
                                        <button onClick={this.handleSave}>Save</button>
                                        <button onClick={this.closeModal}>Cancel</button>
                                    </div>
                                    {/* {screenCapture && <img src={screenCapture} alt="screen capture" />} */}
                                </div>
                            </Popup>
                        </>
                    )}
                </ScreenCapture>
            </Styles>
        );
    }
}