/** @odoo-module **/

import { onWillStart } from "@odoo/owl"
import { _t } from "@web/core/l10n/translation"
import { useService } from "@web/core/utils/hooks"
import { CreateModeDialog } from "./create_mode_dialog/create_mode_dialog"

export const EuroOfficeDocumentsControllerMixin = () => ({
  setup() {
    super.setup(...arguments)
    this.action = useService("action")
    this.dialogService = useService("dialog")
    this.notification = useService("notification")
    onWillStart(async () => (this.formats = await this.loadFormats()))
  },

  // eslint-disable-next-line sort-keys
  getTopBarActionMenuItems() {
    const menuItems = super.getTopBarActionMenuItems()
    const selectionCount = this.model.targetRecords.length
    const singleSelection = selectionCount === 1 && this.targetRecords[0]
    return {
      ...menuItems,
      euro_officeEdit: {
        callback: () => this.euro_officeEditorUrl(singleSelection),
        description: _t("Open in Euro-Office"),
        groupNumber: 1,
        isAvailable: () => this.documentService.userIsInternal && this.showEuroOfficeButton(singleSelection),
        sequence: 52,
      },
    }
  },

  async loadFormats() {
    try {
      const response = await fetch("/euro_office_odoo/static/assets/document_formats/euro-office-docs-formats.json")
      return await response.json()
    } catch (error) {
      console.error("Error loading formats data:", error)
    }
  },

  async onClickCreateEuroOffice() {
    this.dialogService.add(CreateModeDialog, {
      context: this.props.context,
      folderId: this.env.searchModel.getSelectedFolderId(),
      model: this.env.model,
      onShare: (document_id) => this.onClickAdvancedShare(document_id, true),
    })
  },

  euro_officeCanEdit(extension) {
    const format = this.formats.find((f) => f.name === extension.toLowerCase())
    return format && format.actions && format.actions.includes("edit")
  },

  euro_officeCanView(extension) {
    const format = this.formats.find((f) => f.name === extension.toLowerCase())
    return format && format.actions && (format.actions.includes("view") || format.actions.includes("edit"))
  },

  async euro_officeEditorUrl(doc) {
    const demo = JSON.parse(await this.orm.call("euro_office.odoo", "get_demo"))
    if (demo && demo.mode && demo.date) {
      const isValidDate = (d) => d instanceof Date && !isNaN(d)
      demo.date = new Date(Date.parse(demo.date))
      if (isValidDate(demo.date)) {
        const today = new Date()
        const difference = Math.floor((today - demo.date) / (1000 * 60 * 60 * 24))
        if (difference > 30) {
          this.notification.add(
            _t("The 30-day test period is over, you can no longer connect to demo Euro-Office Docs server"),
            {
              title: _t("Euro-Office Docs server"),
              type: "warning",
            },
          )
          return
        }
      }
    }
    const { same_tab } = JSON.parse(await this.orm.call("euro_office.odoo", "get_same_tab"))
    if (same_tab) {
      const action = {
        params: { document_id: doc.data.id },
        tag: "euro_office_editor",
        target: "current",
        type: "ir.actions.client",
      }
      return this.actionService.doAction(action)
    }
    window.open(`/euro_office/editor/document/${doc.data.id}`, "_blank")
  },

  showEuroOfficeButton(records) {
    if (records?.data?.display_name) {
      const ext = records?.data?.display_name.split(".").pop()
      return this.euro_officeCanEdit(ext) || this.euro_officeCanView(ext)
    }
    return false
  },
})
