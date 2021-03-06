"""
JSON objects for use in test files
"""

basic_single = {
    'nodes': [
        {'data': {'label': 'r1', 'type': 'room', 'id': 'r1'}, 'position': {'x': 469, 'y': 306}, 'group': 'nodes',
         'removed': False, 'selected': True, 'selectable': False, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''}],
    'edges': []}

two_rooms_disconnected_json = {
    'nodes': [
        {'data': {'label': 'r1', 'type': 'hallway', 'id': 'r1'}, 'position': {'x': 339, 'y': 365}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''},
        {'data': {'label': 'r2', 'type': 'hallway', 'id': 'r2'}, 'position': {'x': 535, 'y': 365}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''}], 'edges': []}

two_rooms_one_hallway_node_json = {
    'nodes': [
        {'data': {'label': 'r1', 'type': 'room', 'id': 'r1'}, 'position': {'x': 370, 'y': 425}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': False, 'locked': False, 'grabbable': True,
         'pannable': False,
         'classes': ''},
        {'data': {'label': 'r2', 'type': 'room', 'id': 'r2'}, 'position': {'x': 593, 'y': 437}, 'group': 'nodes',
         'removed': False, 'selected': True, 'selectable': False, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''},
        {'data': {'label': 'h1', 'type': 'hallway', 'id': 'h1'}, 'position': {'x': 468, 'y': 418}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''}],
    'edges': [
        {'data': {'id': 'e-r1-h1', 'label': '', 'source': 'r1', 'target': 'h1'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'r-h2-r2', 'label': '', 'source': 'h1', 'target': 'r2'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''}]}

two_rooms_many_hallway_nodes_json = {
    'nodes': [
        {'data': {'label': 'r1', 'type': 'room', 'id': 'r1'}, 'position': {'x': 345, 'y': 424}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': False, 'locked': False, 'grabbable': True,
         'pannable': False,
         'classes': ''},
        {'data': {'label': 'h1', 'type': 'hallway', 'id': 'h1'}, 'position': {'x': 496, 'y': 373}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''},
        {'data': {'label': 'r2', 'type': 'room', 'id': 'r2'}, 'position': {'x': 786, 'y': 410}, 'group': 'nodes',
         'removed': False, 'selected': True, 'selectable': False, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''},
        {'data': {'label': 'h2', 'type': 'hallway', 'id': 'h2'}, 'position': {'x': 573, 'y': 364}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''},
        {'data': {'label': 'h3', 'type': 'hallway', 'id': 'h3'}, 'position': {'x': 648, 'y': 361}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''},
        {'data': {'label': 'h4', 'type': 'hallway', 'id': 'h4'}, 'position': {'x': 732, 'y': 367}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': False,
         'classes': ''}],
    'edges': [
        {'data': {'id': 'e-h1-r1', 'label': '', 'source': 'h1', 'target': 'r1'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-h1-h2', 'label': '', 'source': 'h1', 'target': 'h2'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-h2-h3', 'label': '', 'source': 'h2', 'target': 'h3'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-h3-h4', 'label': '', 'source': 'h3', 'target': 'h4'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-h4-r2', 'label': '', 'source': 'h4', 'target': 'r2'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''}]}

three_rooms_many_hall_ways_nodes_json = {
    'nodes': [
        {'data': {'label': 'A', 'type': 'room', 'id': 'A'}, 'position': {'x': 190, 'y': 294}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': False, 'locked': False, 'grabbable': True,
         'pannable': False,
         'classes': ''},
        {'data': {'label': 'B', 'type': 'room', 'id': 'B'}, 'position': {'x': 429, 'y': 296}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': False, 'locked': False, 'grabbable': True,
         'pannable': False,
         'classes': ''},
        {'data': {'label': 'C', 'type': 'room', 'id': 'C'}, 'position': {'x': 552, 'y': 294}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': False, 'locked': False, 'grabbable': True,
         'pannable': False,
         'classes': ''},
        {'data': {'label': 'hn1', 'type': 'hallway', 'id': 'hn1'}, 'position': {'x': 308, 'y': 223}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': False, 'locked': False, 'grabbable': True,
         'pannable': False,
         'classes': ''},
        {'data': {'label': 'hn2', 'type': 'hallway', 'id': 'hn2'}, 'position': {'x': 336, 'y': 340}, 'group': 'nodes',
         'removed': False, 'selected': False, 'selectable': False, 'locked': False, 'grabbable': True,
         'pannable': False,
         'classes': ''}],
    'edges': [
        {'data': {'id': 'e-hn1-B', 'label': '', 'source': 'hn1', 'target': 'B'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-A-hn1', 'label': '', 'source': 'A', 'target': 'hn1'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-A-B', 'label': '', 'source': 'A', 'target': 'B'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': True,
         'classes': ''},
        {'data': {'id': 'e-hn2-B', 'label': '', 'source': 'A', 'target': 'hn1'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-A-hn2', 'label': '', 'source': 'A', 'target': 'hn2'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges', 'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True,
         'pannable': True, 'classes': ''},
        {'data': {'id': 'e-B-C', 'label': '', 'source': 'B', 'target': 'C'}, 'position': {'x': 0, 'y': 0},
         'group': 'edges',
         'removed': False, 'selected': False, 'selectable': True, 'locked': False, 'grabbable': True, 'pannable': True,
         'classes': ''}]}
