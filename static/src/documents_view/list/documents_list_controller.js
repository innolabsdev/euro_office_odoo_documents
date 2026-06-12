/** @odoo-module **/

import { DocumentsListController } from "@documents/views/list/documents_list_controller"
import { patch } from "@web/core/utils/patch"
import { EuroOfficeDocumentsControllerMixin } from "../euro_office_odoo_documents_controller_mixin"

patch(DocumentsListController.prototype, EuroOfficeDocumentsControllerMixin())
