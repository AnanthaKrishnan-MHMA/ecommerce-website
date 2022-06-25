
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        let keyword = {
            name: {
                $regex: this.queryStr.name,
                $options: "i"
            }
        };
        this.query = this.query.find({ ...keyword });
        return this;
    }
    filter() {

        let allQuery = { ...this.queryStr };

        allQuery = JSON.stringify(allQuery);
        allQuery = allQuery.replace(/\b(lt|lte|gt|gte)\b/g, function (key) {
            return `$${key}`;
        });
        console.log(allQuery);
        return this;
    }

}

module.exports = ApiFeatures;