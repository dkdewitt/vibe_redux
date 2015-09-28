
import vibe.core.core;
import vibe.core.log;
import vibe.data.json;
import vibe.http.rest;
import vibe.http.router;
import vibe.http.server;
import std.stdio;


struct Groups{
    Group[] groups;
}



struct Group {
    string title;
    string description;
}


@path("api")
interface MyAPI {
    @path("groups/") @method(HTTPMethod.GET)
    Groups getGroups();

    @path("groups") @method(HTTPMethod.POST)
    void addGroup(Json group);
}

class GroupAPI : MyAPI {

    private Groups _groups;

    void initialize(){
        auto g1 = Group("Admin Group", "This is the Admin Group");
        auto g2 = Group("Music Group", "This is the Music Group");

        _groups.groups ~= [g1, g2];
    }


    override:
        Groups getGroups()
        {
            return _groups;
        }
        void addGroup(Json group)
        {
            writeln(group.description);
            auto newGroup = Group(group.title.toString(), group.description.toString());
            _groups.groups ~= newGroup;
        } 
    }


void addACAO(HTTPServerRequest req, HTTPServerResponse res)
{
    res.headers["Access-Control-Allow-Origin"] = "*";
}


shared static this()
{
    auto router = new URLRouter;
    router.any("*", &addACAO);
    GroupAPI api = new GroupAPI();
    api.initialize();
    registerRestInterface(router, api);

    auto routes = router.getAllRoutes();

    auto settings = new HTTPServerSettings;
    settings.port = 5000;
    settings.bindAddresses = ["::1", "127.0.0.1"];
    listenHTTP(settings, router);
    //writeln(router.getAllRoutes());

    
    runTask({
        auto client = new RestInterfaceClient!MyAPI("http://127.0.0.1:5000/");
        

        Json g1 = Json.emptyObject();
        g1["title"] = "New Group";
        g1["description"] = "New Group";
        client.addGroup(g1);
        
        
        
    });
}