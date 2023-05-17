
const data_obj = {
    data: {
        brand: "musinsa",
        url: "https://musinsa.com",
        primary_key: "url",
    },
};

const pk = data_obj.data.primary_key;
const insert_data = { ...data_obj.data };
console.log(insert_data);

delete insert_data[`${pk}`];
delete insert_data[`primary_key`];

console.log(insert_data);