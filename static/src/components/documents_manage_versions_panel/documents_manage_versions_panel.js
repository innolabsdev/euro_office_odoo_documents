/** @odoo-module **/

// eslint-disable-next-line @stylistic/max-len
import { DocumentsManageVersions } from "@documents/components/documents_manage_versions_panel/documents_manage_versions_panel"
import { patch } from "@web/core/utils/patch"

patch(DocumentsManageVersions.prototype, {
  onOpenInEuroOffice(attachmentId) {
    window.open(`/euro_office/editor/${attachmentId}`, "_blank")
  },
})
