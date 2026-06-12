from odoo import _, fields, models


class EuroOfficeDocumentsAccessUser(models.Model):
    _name = "euro_office.odoo.documents.access.user"
    _description = "Euro-Office Documents Access Users"

    document_id = fields.Many2one("documents.document", required=True, ondelete="cascade")
    user_id = fields.Many2one("res.partner", required=True, string="User")
    role = fields.Selection(
        [
            ("none", _("None")),
            ("view", _("Viewer")),
            ("commenter", _("Commenter")),
            ("reviewer", _("Reviewer")),
            ("edit", _("Editor")),
            ("form_filling", _("Form Filling")),
            ("custom_filter", _("Custom Filter")),
        ],
        required=True,
        string="Access Level",
    )
