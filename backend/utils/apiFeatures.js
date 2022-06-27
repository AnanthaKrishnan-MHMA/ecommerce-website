
class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        console.log('starting search..');

        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        } : {}
        this.query = this.query.find({ ...keyword });
        
        console.log('ending search');
        return this;
    }

    filter() {
        console.log('starting filter');
        // creating copy of query string
        let dupQueryStr = { ...this.queryStr };
        // fields to be removed from query
        const removeFields = ["keyword", "page", "limit"];
        // removing terms from copy fo query string
        removeFields.forEach(key => delete dupQueryStr[key]);

        // JSON >> String >> replace with proper syntax >> JSON
        dupQueryStr = JSON.stringify(dupQueryStr);
        dupQueryStr = dupQueryStr.replace(/\b(lt|lte|gt|gte)\b/g, function (key) {
            return `$${key}`;
        });
        dupQueryStr = JSON.parse(dupQueryStr);
        console.log('..dupQueryStr : ', dupQueryStr);

        this.query = this.query.find({ ...dupQueryStr });
        console.log('ending filter');
        return this;
    }
    pagination(resultPerPage){
        let currentPage = Number(this.queryStr.page) || 1;
        let skip = resultPerPage * (currentPage - 1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }

}

module.exports = ApiFeatures;