exports.createShopsRef = (shopRows) => {
    const ref = {};
    
    shopRows.forEach((shopRow) => {
    ref[shopRow.shop_name] = shopRow.shop_id;
    });
    return ref;
    }; 

exports.formatTreasureRef = (treasureData, shopReference) => {
    return treasureData.map(treasure => {
        return [treasure.treasure_name, treasure.colour, treasure.age, treasure.cost_at_auction, shopReference [treasure.shop]] 
    })
}