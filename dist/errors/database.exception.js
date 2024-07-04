"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseException = void 0;
const common_1 = require("@nestjs/common");
class DatabaseException extends common_1.HttpException {
    constructor(message) {
        super(message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
exports.DatabaseException = DatabaseException;
//# sourceMappingURL=database.exception.js.map