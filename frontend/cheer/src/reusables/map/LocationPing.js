import React from "react";
import { Icon } from '@iconify/react'
import './Map.css'

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon="mdi:map-marker" className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )

  export default LocationPin