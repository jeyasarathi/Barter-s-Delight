Doc Search
----------


.. http:get:: /api/v2/docsearch/

    :string project: **Required**. The slug of a project. 
    :string version: **Required**. The slug of the version for this project.
    :string q: **Required**. The search query

    You can search a specific set of documentation using our doc search endpoint.
    It returns data in the format of Elastic Search,
    which requires a bit of traversing to use.

    In the future we might change the format of this endpoint to make it more abstact.

    An example URL: http://readthedocs.org/api/v2/docsearch/?project=docs&version=latest&q=subdomains


    Results:

   .. sourcecode:: js
  

        {
            "results": {
                "hits": {
                    "hits": [
                        {
                            "fields": {
                                "link": "http://localhost:9999/docs/test-docs/en/latest/history/classes/coworking",
                                "path": [
                                    "history/classes/coworking"
                                ],
                                "project": [
                                    "test-docs"
                                ],
                                "title": [
                                    "PIE coworking"
                                ],
                                "version": [
                                    "latest"
                                ]
                            },
                            "highlight": {
                                "content": [
                                    "\nhelp fund more endeavors. Beta <em>test</em>  This first iteration of PIE was a very underground project"
                                ]
                            }
                        },
                    ],
                    "max_score": 0.47553805,
                    "total": 2
                }
            }
        }
