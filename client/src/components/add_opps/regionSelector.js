import React from 'react'

export default function RegionSelector({value, onChange, required}) {
    return (
        <div className="form-group">
            <label className="input-title">Region <span style={{'color': 'red'}}>*</span></label>
            <select type="text" style={{border: "2px solid var(--accent)", backgroundColor: '#fff', "color": 'black'}}
                                required={required}
                                className="form-control"
                                value={value}
                                onChange={({ target: { value } }) => onChange(value)}
                            >
                                <option value="">Please choose where this opportunity is restricted to:</option>
                                <option value="Global">International/Global</option>

                                <optgroup label="Popular Countries">
                                    <option value="Canada">Canada</option>
                                    <option value="USA">USA</option>
                                    <option value="India">India</option>
                                    <option value="Hong Kong">Hong Kong</option>
                                    <option value="United Kingdom">United Kingdom</option>
                                </optgroup>

                                <optgroup label="Continents">
                                    <option value="North America">North America</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Africa">Africa</option>
                                    <option value="South America">South America</option>
                                </optgroup>

                            </select>
        </div>
    )
}
