const {parseLocation, parseRotation, parseChance} = require("./utils.js")

module.exports = function($) {
    const table = $("#missionRewards").next("table")

    const tbody = table.children()['0']

    let location = null
    let rotation = null

    let items = []

    for(let tr of tbody.children) {
        let elem = tr.children[0]
        let text = $(elem).text()

        if(elem.name === "th") {
            let tmp = parseLocation(text)

            if(tmp) {
                location = tmp
            } else {
                tmp = parseRotation(text)

                if(tmp) {
                    rotation = tmp
                }
            }
        }

        if(elem.name === "td" && elem.attribs.class !== "blank-row") {
            let chanceElem = tr.children[1]
            let chance = parseChance($(chanceElem).text())

            items.push({
                planet: location.planet,
                location: location.location,
                gameMode: location.gameMode,
                rotation: rotation,
                itemName: text,
                rarity: chance.rarity,
                chance: Number(chance.chance)
            })
        }
    }

    return items
}