import Array "mo:base/Array";

actor listajuegos {

  type juego = {
    id : Nat;
    title : Text;
    descripcion : Text;
    calificacion : Nat;
  };

  var juegos : [juego] = [
    {
      id = 1;
      title = "Call of duty: Black Ops II";
      descripcion = "Shooter";
      calificacion = 5;
    }
  ];

  public func addjuego(title : Text, descripcion : Text, calificacion : Nat) : async Bool{
    let newId = Array.size(juegos) + 1;
    let newJuego = {
      id = newId;
      title = title;
      descripcion = descripcion;
      calificacion = calificacion;
    };
    juegos := Array.append<juego>(juegos,[newJuego]);
    return true;
  };

  public func getAllJuegos() : async [juego]{
    return juegos;
  };

  public func getjuegoById(id : Nat) : async ?juego {
    return Array.find<juego>(juegos, func(m) {m.id == id});
  };
  public func updatejuego(id : Nat, title : Text, descripcion : Text, calificacion : Nat) : async Bool{
    let juegoToUpdate = Array.find<juego>(juegos, func(task) { task.id == id });

    switch(juegoToUpdate) {
      case(null) {return false};
      case(?juegoToUpdate) {
        let updatejuego = {
          id = id;
          title = title;
          descripcion = descripcion;
          calificacion = calificacion;
        };
        juegos := Array.map<juego, juego>(juegos, func(m) { if (m.id == id) { updatejuego } else { m } });
        return true;
       };
    };
  };
  public func deletejuego(id : Nat) : async Bool{
    let juego = Array.find<juego>(juegos, func(task) { task.id == id});
    if (juego != null){
      juegos := Array.filter<juego>(juegos, func(task) { task.id != id});
      return true;
    }else {
      return false;
    };
  };
};