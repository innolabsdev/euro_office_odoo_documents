/** @odoo-module **/

import { DocumentsKanbanController } from "@documents/views/kanban/documents_kanban_controller"
import { patch } from "@web/core/utils/patch"
import { EuroOfficeDocumentsControllerMixin } from "../euro_office_odoo_documents_controller_mixin"

patch(DocumentsKanbanController.prototype, EuroOfficeDocumentsControllerMixin())
