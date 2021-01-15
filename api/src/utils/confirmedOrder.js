const oneOrder = require("./oneOrder")

async function confirmedOrder({ id, total }) {
    const Order = await oneOrder(id);
    const update = await Order.update(
        {
            status: "procesando"
        },
        {
            where: {
                id,
            },
            returning: true,
        }
    );
    console.log(update.user.givenname, "ñsñaasñañsña")
    const data = {
        to: update.user.email,  //Order.user.email
        total_compra: total,
        address: update.user.adress,
        username: `${update.user.givenname} ${update.user.familyname}`,
        id: id,
        products:
            Order.products.map((product) => ({
                id: product.id,
                name: product.name,
                thumbnail: product.thumbnail,
                description: product.description,
                Order_products: {
                    quantity: product.Order_products.dataValues.quantity,
                    unitprice: product.Order_products.dataValues.unitprice,
                }
            }))
    }
    return data
}

module.exports = confirmedOrder;