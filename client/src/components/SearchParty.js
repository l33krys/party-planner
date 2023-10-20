import React from 'react'
import { Select } from 'semantic-ui-react'


const SearchParty = ({ parties }) => {
    const options = [
        { key: 1, text: 'Choice 1', value: 1 },
        { key: 2, text: 'Choice 2', value: 2 },
        { key: 3, text: 'Choice 3', value: 3 },
      ]
    
    console.log(parties)
    const partylist = []
    const test = parties.map((party) => {
        {partylist.push(party)}
    })

    // function createPartyOptions(parties) {
    //     for (let i = 0; i < parties.length; i++) {
    //         { key: {i}, text: {parties.name}, value: {parties.id} } 
    // }

    let partyOptions = Object.assign({}, ...parties.map((party) => ({["party.id"]: party.name})))
    let partyOptions2 = Object.fromEntries(parties.map((party) => [party.id, party.name]))
    console.log(partyOptions2)

    return (

        <div style={{ width: '75%', margin: '0 auto' }}>
            {/* <h3>Filter Party</h3>
            <Select placeholder='Select a party' options={options} /> */}

        </div>


    )

}

export default SearchParty;