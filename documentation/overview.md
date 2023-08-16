<p align="center">
    <img src="./assets/Title Card.png\" width="100%"/>
</p>

## Project Motivation
After the flight of Xenia-1 concerns were brought up about the current state of the ground station. Ground station itself was not used on the day of the flight and stopped working due to overdraw on the battery system. As a replacement a laptop with a USB SDR was used and worked perfectly. Since the internals of the original ground station were basically the same as a laptop, it was determined that an SRAD hardware ground station was redundant. The current software requires a decent amount of setup and tuning of the SDR. The goal of an app would be to handle all the more technical setup in a more approachable way.

<p align="center">
    <img src="./assets/x-ground-station.png\" width="600"/>
</p>

## Project Description
The goal of this project is to create an application that can be run on any OS with an external usb SDR. This application would visualize live data broadcasted from the flight on a non command line interface. The project will be coded in such a way where it is easy to change the layout of the UI, update components, and try to be compatible with most OSs. The software will be able to pick up multiple signals from independently-recoverable systems.



