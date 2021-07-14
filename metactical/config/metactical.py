# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from frappe import _

def get_data():
	return [
		{
			"module_name": "Metactical",
			"color": "grey",
			"icon": "octicon octicon-file-directory",
			"type": "module",
			"label": _("Metactical Items"),
			"items": [
				{
					"type": "doctype",
					"name": "Item Search Settings",
					"description": _("Item Search Settings."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Item Search Settings Warehouse",
					"description": _("Item Search Settings Warehouse."),
					"onboard": 1,
				},
				{
					"type": "doctype",
					"name": "Shipstation API Requests",
					"description": _("Shipstation API Requests."),
					"onboard": 1,
				},
			]
		},
		{
			"label": _("Reports"),
			"icon": "fa fa-list",
			"items": [
					{
						"type": "report",
						"is_query_report": True,
						"name": "POS Discount Report",
						"doctype": "Sales Invoice",
						"onboard": 1,
					},
					{
						"type": "report",
						"name": "Item-Wise Sales Invoice Report",
						"doctype": "Sales Invoice",
						"is_query_report": True,
						"onboard": 1,
					},
					{
						"type": "report",
						"name": "Sales Report RASUSA - Full V1",
						"doctype": "Sales Invoice",
						"is_query_report": True,
						
					},
					{
						"type": "report",
						"is_query_report": True,
						"name": "Payments Status",
						"doctype": "Sales Order",
					},
					{
						"type": "report",
						"is_query_report": True,
						"name": "Ready to Ship - Orders",
						"doctype": "Sales Order",
					},
					{
						"type": "report",
						"is_query_report": True,
						"name": "Pick List Status",
						"doctype": "Sales Order",
					},
					{
						"type": "report",
						"is_query_report": True,
						"name": "Sales Report - Stores",
						"doctype": "Stock Ledger Entry",
					},
				]
			},
		]