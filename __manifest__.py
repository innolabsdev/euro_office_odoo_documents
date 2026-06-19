# pylint: disable=pointless-statement
{
    "name": "Euro-Office Documents",
    "summary": "Edit and collaborate on office files within Odoo Documents.",
    "description": "The Euro-Office app allows users to edit and collaborate on office files within Odoo Documents using Euro-Office Docs. You can work with text documents, spreadsheets, and presentations, co-author documents in real time using two co-editing modes (Fast and Strict), Track Changes, comments, and built-in chat.",  # noqa: E501
    "author": "Innolabs.dev",
    "website": "https://github.com/Euro-Office/euro_office_odoo",
    "category": "Productivity",
    "version": "19.0.6.2.3",
    "depends": ["euro_office_odoo", "documents"],
    # always loaded
    "data": [
        "security/ir.model.access.csv",
        "views/euro_office_templates_share.xml",
        "views/documents_sharing_views.xml",
    ],
    "license": "LGPL-3",
    "support": "hello@innolabs.dev",
    "images": [
        "static/description/main_screenshot.png",
        "static/description/editors.png",
        "static/description/edit_files.png",
        "static/description/create_files.png",
    ],
    "installable": True,
    "application": True,
    "assets": {
        "web.assets_backend": [
            "euro_office_odoo_documents/static/src/models/*.js",
            "euro_office_odoo_documents/static/src/documents_view/**/*",
            "euro_office_odoo_documents/static/src/euro_office_create_template/**/*",
            "euro_office_odoo_documents/static/src/components/**/*",
            ("remove", "euro_office_odoo_documents/static/src/**/*.dark.scss"),
        ],
        "web.assets_web_dark": [
            "euro_office_odoo_documents/static/src/**/*.dark.scss",
        ],
    },
}
